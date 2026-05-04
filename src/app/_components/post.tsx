"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [listings] = api.listing.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      setName("");
      setQuantity("1");
    },
  });

  const latestListing = listings.at(0);

  return (
    <div className="w-full max-w-xs">
      {latestListing ? (
        <p className="truncate">Your most recent listing: {latestListing.name}</p>
      ) : (
        <p>You have no listings yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name, quantity: Number(quantity) });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
