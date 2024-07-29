import Image from "next/image";

export default function PreviewProfile() {
  return (
    <div className="py-8">
      <div className="text-center text-xl font-bold">Your Profile!</div>
      <div className="flex py-8 justify-center">
        <div className="grid grid-rows-2 grid-cols-1 gap-y-[2.75rem]">
          <div className="relative">
            <figure className="absolute">
              <Image
                className="rounded-lg"
                src="/pulp.webp"
                height={500}
                width={500}
                alt="TV/Movie"
                priority
              />
            </figure>
            <div className="avatar ml-5 mt-5 absolute">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Jane Doe</h2>
              <p>Favorite TV Show: New girl</p>
              <p>Favorite Movie: Pulp Fiction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
