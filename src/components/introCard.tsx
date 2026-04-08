import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TFunction } from "i18next";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const IntroCard = ({
  t,
  category,
}: {
  t: TFunction<"home", undefined>;
  category: string;
}) => {
  return (
    <Card className="mx-fit relative w-full max-w-sm pt-0">
      <Image
        src={`/images/${category}-intro.jpg`}
        width={100}
        height={100}
        sizes="100vw"
        alt="storage-intro-image"
        className="relative z-30 aspect-video w-full object-cover dark:brightness-40"
      />
      <CardAction className="ml-3">
        <Badge variant="secondary">{t(category)}</Badge>
      </CardAction>
      <CardHeader>
        <CardTitle>{t(`card-${category}-title`)}</CardTitle>
        <CardDescription>{t(`card-${category}-content`)}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
};
