import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";

export default function Welcome({ nextStep }: { nextStep: any }) {
  let pins = [
    {
      id: 1,
      name: "Little Women",
      designation: "Favorite Movie",
      image:
        "https://image.tmdb.org/t/p/original/yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg",
    },
    {
      id: 2,
      name: "Resident Alien",
      designation: "Favorite TV Show",
      image:
        "https://image.tmdb.org/t/p/original/5van3ktOTqWr5lcixh5aR8NlqqW.jpg",
    },
    {
      id: 3,
      name: "Severance",
      designation: "Current TV Show",
      image:
        "https://image.tmdb.org/t/p/original/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
    },
    {
      id: 4,
      name: "Avatar",
      designation: "Avatar",
      image: "/pulp.webp",
    },
  ];

  return (
    <div className="flex flex-col pb-24 items-center">
      <div className="pt-8 text-3xl font-bold">
        <span>Welcome to </span>
        <span className="text-teal-900">the</span>
        <span className="text-teal-700">watercooler!</span>
      </div>

      <CardContainer className="inter-var h-full">
        <CardBody className="flex bg-rose-100 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border">
          <CardItem translateZ="50" className="flex-none w-2/5">
            <Image
              src={
                "https://image.tmdb.org/t/p/original/lFf6LLrQjYldcZItzOkGmMMigP7.jpg"
              }
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="ml-2">
            <CardItem
              translateZ="100"
              className="flex w-full text-xl font-bold text-sky-600"
            >
              {"theonceler"}
              <p className="text-xs mt-1.5 ml-1"> ({"Patrick Dai"})</p>
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
            >
              <div className="w-full">
                <h2 className="card-title">Bio</h2>
                <p className="whitespace-pre-wrap text-xs">
                  {"Hi, I go to UCLA, currently a junior. I wanna fix cars."}
                </p>
              </div>
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
            >
              <AnimatedTooltipPreview pins={pins} />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      <div className="mt-8 text-md font-bold">
        In the next steps, you&apos;ll be building a profile like the ones above
      </div>

      <div className="py-8">
        <button className="btn btn-primary" onClick={nextStep}>
          Build Profile
        </button>
      </div>
    </div>
  );
}
