"use server"

import { geRandomUsers } from "@/actions/user"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

async function WhoToFollow() {
    const users = await geRandomUsers()

    if (users.length === 0) return null;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Who to follow</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="space-y-4">
                    {users.map((user) => (
                        <div key={user.id} className="flex gap-2 items-center justify-between ">
                        <div className="flex items-center gap-1">
                            <Link href={`/profile/${user.username}`}>
                            <Avatar>
                                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpUJhFwB85GyHaxths8hBLh6L9kSmttcgOQ&s" />
                            </Avatar>
                            </Link>
                            <div className="text-xs">
                            <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer">
                                {user.name}
                            </Link>
                            <p className="text-muted-foreground">@{user.username}</p>
                            <p className="text-muted-foreground">{user._count.followers} followers</p>
                            </div>
                        </div>
                        <Button>Follow</ Button>
                        </div>
                     ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WhoToFollow