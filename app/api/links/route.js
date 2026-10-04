import connectDB from "@/lib/mongodb";
import Link from "@/models/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    await connectDB();
    const links = await Link.find();
    return new Response(JSON.stringify(links), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function POST(req) {
    await connectDB();

    const { url, shortUrl, expirationDate, clickCount, createdAt } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const newLink = new Link({ url, shortUrl, userId, expirationDate, clickCount, createdAt });
    await newLink.save();

    return new Response(JSON.stringify(newLink), {
        status: 201,
        headers: {
            "Content-Type": "application/json"
        }
    });
}