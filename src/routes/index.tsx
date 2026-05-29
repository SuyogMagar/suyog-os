import { createFileRoute } from "@tanstack/react-router";
import { Shell, SrOnlyHeading } from "@/components/terminal/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suyog Magar — Backend Engineer // Terminal Portfolio" },
      {
        name: "description",
        content:
          "Suyog Magar — Backend Engineer. Java, Spring Boot, Kafka, Redis, Docker, Kubernetes. An interactive terminal-style portfolio.",
      },
      { property: "og:title", content: "Suyog Magar — Backend Engineer" },
      {
        property: "og:description",
        content: "Interactive terminal portfolio. Linux user. System builder. Infrastructure-oriented.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SrOnlyHeading />
      <Shell />
    </>
  );
}
