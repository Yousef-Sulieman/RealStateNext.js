import React from "react";
import Hero from "./_components/Hero";
import FeaturedProperties from "./_components/FeaturedProperties";
import WhatWeDo from "./_components/WhatWeDo";
import ConnectingPeople from "./_components/ConnectingPeople";
import WhatClientWant from "./_components/WhatClientWant";
function page() {
  return (
    <div className="">
      <Hero />
      <FeaturedProperties />
      <WhatWeDo />
      <ConnectingPeople />
      <WhatClientWant />
    </div>
  );
}

export default page;
