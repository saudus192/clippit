import connectDB from "@/lib/mongodb";
import Link from "@/models/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    await connectDB();

    const { id } = await params;
    const link = await Link.findById(id);

    if (!link) {
        return new Response(JSON.stringify({ error: "Link not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const linkOwnerId = link.userId ? link.userId.toString() : null;

    if (linkOwnerId !== userId) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    await Link.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}