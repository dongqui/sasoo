import { LinkCard } from "../LinkCard/LinkCard";
import supabase from "@/shared/config/supabase";

import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export async function LinkCardList() {
  const links = await supabase
    .from("Link")
    .select()
    .order("created_at", { ascending: false });

  return (
    <ul className={cx("container")}>
      {links.data?.map((link, index) => (
        <li key={link.id}>
          <LinkCard {...link} priority={index >= 12} />
        </li>
      ))}
    </ul>
  );
}
