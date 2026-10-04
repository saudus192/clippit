import React from 'react'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from '@/models/link'
import connectDB from '@/lib/mongodb'
import DashboardClient from '@/components/dashboardclient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  await connectDB();
  const links = await Link.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();

  return <DashboardClient user={session.user} links={JSON.parse(JSON.stringify(links))} />;
}