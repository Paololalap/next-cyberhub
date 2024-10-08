"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import formatDateToWords from "@/constants/DATE_TO_WORDS";
import { openSans } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Article({
  title,
  author,
  date,
  tags,
  body,
  imageL,
  link,
}) {
  return (
    <div className="flex flex-col bg-white p-8 lg:mx-auto lg:w-[75rem]">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="w-full max-w-[55rem]">
        <div className="mb-4 text-gray-700">{author}</div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-x-1 text-gray-600">
            <CalendarDays className="size-5" />
            {formatDateToWords(date)}
          </div>
          <div className="flex flex-wrap gap-x-1 italic">
            {tags.map((tag, index) => (
              <Badge key={index} className="bg-[#6E102C] hover:bg-[#6E102C]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {imageL && (
          <div className="relative mb-4">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageL}
                alt="Content Image"
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
              />
            </AspectRatio>
          </div>
        )}
        <pre
          className={cn(
            "mb-4 whitespace-pre-wrap text-gray-600",
            openSans.className,
          )}
        >
          {`${body}`}
        </pre>
        <p className="text-sm italic">
          Source: <Link href={link}>{link}</Link>
        </p>
      </div>
    </div>
  );
}
