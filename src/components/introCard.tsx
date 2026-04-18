"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TFunction } from "i18next";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const IntroCard = ({
  t,
  category,
  tailwindBgColor,
  // direction,
}: {
  t: TFunction<"home", undefined>;
  category: string;
  tailwindBgColor: string;
  // direction: string;
}) => {
  const router = useRouter();
  return (
    <Card
      className={`mx-fit relative w-full max-w-sm shrink-0 ${tailwindBgColor} snap-start pt-0`}
    >
      <Image
        src={`/images/${category}-intro.jpg`}
        width={100}
        height={100}
        sizes="100vw"
        alt={`${category}-intro-image`}
        className="relative z-100 aspect-video w-full object-cover"
      />
      <CardAction className="ml-3">
        <Badge variant="secondary" className="bg-gray-100/50">
          {t(category)}
        </Badge>
      </CardAction>
      <CardHeader className="gap-4">
        <CardTitle className="text-white">
          {t(`card-${category}-title`)}
        </CardTitle>
        <CardDescription className="text-white">
          {t(`card-${category}-content`)}
        </CardDescription>
        <div className="flex flex-col gap-8">
          <Button
            variant="default"
            size="icon"
            className="dark rounded-full bg-white"
            onClick={() => router.push("")}
          >
            <ArrowRight />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
