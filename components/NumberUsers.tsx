import React from "react";
import { db } from "@/db";
import { coders } from "@/db/schema";
import { count } from "drizzle-orm";

const NumberUsers = async () => {
  const totalNumber = await db.select({ count: count() }).from(coders);
  console.log(totalNumber);
  return <p>{totalNumber[0].count}</p>;
};

export default NumberUsers;
