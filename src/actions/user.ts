"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"


export async function syncUser() {
    try {
        const {userId} = await auth();
        const user = await currentUser();

        if (!user || !userId) return;
        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        });

        if (existingUser) return existingUser;

        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name:`${user.firstName} ${user.lastName}`.trim(),
                username: user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image : user.imageUrl,
            }
        });
        return dbUser;

    } catch (error) {
        console.log(error)
    }
}


export async function getUserByClerkId(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: {
            clerkId: clerkId,
        },
        include:{
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                }
            }
        }
    });
    return user;
}


export async  function getDbUserId(){
    const {userId :clerkId} = await auth();
    if(!clerkId) throw new Error("Unauthorized");

    const user = await getUserByClerkId(clerkId);
    
    if(!user) throw new Error("User not found");

    return user.id;

}

export async function geRandomUsers(){
try {
    const userId = await getDbUserId();

    const geRandomUsers = await prisma.user.findMany({
        where:{
            AND: [
                {NOT : {followers: {some: {followerId: userId}}}}
            ]
        },select:{
            id: true,
            name: true,
            username: true,
            _count: {
                select: {
                    followers: true,
                },
            },
        }
    }
);
    return geRandomUsers;
} catch (error) {
    console.log(error);
    return [];
}
}