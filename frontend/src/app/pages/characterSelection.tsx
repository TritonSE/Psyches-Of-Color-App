import { CharacterCard } from "@/components/CharacterCard";

export default function CharacterSelection() {
  return (
    <CharacterCard
      color="#FFC97E"
      character="Fire"
      characterIcon={require("@/assets/fire.png")}
    ></CharacterCard>
  );
}
