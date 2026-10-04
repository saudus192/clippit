import { notFound, redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Link from "@/models/link";

export default async function Page({ params }) {
    await connectDB();
    const { shorturl } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const fullShortUrl = baseUrl
        ? new URL(shorturl, `${baseUrl.replace(/\/$/, "")}/`).toString()
        : shorturl;
    const link = await Link.findOneAndUpdate({
        shortUrl: { $in: [shorturl, fullShortUrl] }
    }, {
        $inc: { clickCount: 1 }
    }, {
        new: true
    }).lean();
    if (!link) {
        notFound();
    }
    console.log("URL:", link.url);
    return redirect(link.url);
}
