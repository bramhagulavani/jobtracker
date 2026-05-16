import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const id = params.id?.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    const job = await Job.findOne({ _id: id, userId }).lean();
    if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

    return NextResponse.json({ ...job, _id: (job._id as any).toString() });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();
    const id = params.id?.trim();

    const updated = await Job.findOneAndUpdate({ _id: id, userId }, body, { new: true });
    if (!updated) return NextResponse.json({ message: "Job not found or unauthorized" }, { status: 404 });

    return NextResponse.json({ ...updated.toObject(), _id: updated._id.toString() });
  } catch {
    return NextResponse.json({ message: "Error updating job" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const id = params.id?.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    const deleted = await Job.findOneAndDelete({ _id: id, userId });
    if (!deleted) return NextResponse.json({ message: "Job not found or unauthorized" }, { status: 404 });

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}