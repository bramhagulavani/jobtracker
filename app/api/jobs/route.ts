import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json([], { status: 200 });

    await connectToDatabase();
    const jobs = await Job.find({ userId }).sort({ createdAt: -1 }).lean();
    const sanitized = jobs.map((j: any) => ({ ...j, _id: j._id.toString() }));
    return NextResponse.json(sanitized, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();
    const newJob = await Job.create({ ...body, userId });

    return NextResponse.json(
      { message: "Job added successfully", data: { ...newJob.toObject(), _id: newJob._id.toString() } },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Error adding job", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}