"use client";

import TableLoader from "@/components/Loaders/tableLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionWrapper from "@/hoc/sectionWrapper";
import { difficultyColors, showToast } from "@/lib";
import { DELETE_PROBLEM } from "@/lib/services";
import { CodingProblemType } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { removeProblem } from "@/redux/slice/problemSlice";
import { useMutation } from "@apollo/client";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProblemsPage() {
  const [DeleteCodingProblem] = useMutation(DELETE_PROBLEM);
  const dispatch = useAppDispatch();
  const { problems, loading } = useAppSelector((state) => state.problems);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    if (!id) {
      console.log("there is no such problem :>");
      return;
    }
    try {
      const res = await DeleteCodingProblem({ variables: { id: id } });
      if (res.data.deleteCodingProblem) {
        dispatch(removeProblem(id));
        showToast("Problem Deleted Successfully", "success");
      } else {
        console.log("Unable to delete problem");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <SectionWrapper>
        <div className="min-h-screen mx-w-3xl py-12">
          <header className="container  mx-auto flex h-[25vh] flex-col gap-4">
            <Skeleton className="h-full w-full" />
          </header>
          <main>
            <TableLoader />
          </main>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Coding Problems</h1>
          <Link href="/admin/problems/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Problem
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Topics</TableHead>
                <TableHead>Test Cases</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem: CodingProblemType) => (
                <TableRow key={problem.id}>
                  <TableCell
                    onClick={() => router.push(`/problem/${problem.id}`)}
                    className="font-medium cursor-pointer hover:text-blue-500"
                  >
                    {problem.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        difficultyColors[problem.difficulty.toLowerCase()]
                      }
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {problem.topic.map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{problem.testCases.length} cases</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/problems/edit/${problem.id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          handleDelete(problem.id);
                        }}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SectionWrapper>
  );
}
