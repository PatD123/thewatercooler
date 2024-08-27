import Image from "next/image";

export default function OnProfile({
  favTVShowSrc,
  bio,
}: {
  favTVShowSrc: string;
  bio: string;
}) {
  return (
    <div className="mt-10 px-4 pb-2 w-full h-full">
      <div className="h-[95%]">
        <div className="bg-white/10 rounded-lg h-full text-white p-3">
          <div className="flex">
            {/* Left Side */}
            <div className="flex-none h-full">
              <h1 className="text-slate-200 font-bold">Favorite TV Shows</h1>
              <div className="grid grid-rows-1 grid-cols-4 mt-2 gap-x-3">
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <h1 className="text-slate-200 font-bold mt-2">Favorite Movies</h1>
              <div className="grid grid-rows-1 grid-cols-4 mt-2 gap-x-3">
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={favTVShowSrc}
                    alt="currTVShowPosterSrc"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <h1 className="text-slate-200 font-bold mt-2">Tags</h1>
              <div className="flex">
                {[1, 2, 3, 4].map((vals, i) => (
                  <span className="rounded-lg bg-green-400 px-2 py-2 text-xs text-green-700/70 mr-1 mt-2">
                    Fanatic
                  </span>
                ))}
              </div>
            </div>
            {/* Divider */}
            <div className="divider divider-horizontal divider-info"></div>
            {/* Right Side */}
            <div className="h-full">
              <div className="text-lg text-slate-200 font-bold">Bio</div>
              <div className="text-sm text-slate-300">{bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
