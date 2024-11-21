import Link from "next/link";

export default function Home() {
  return (
    <Link href="/matches" legacyBehavior>
      <a>
        View Matches
      </a>
    </Link>
  );
}
