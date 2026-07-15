import Image from "next/image";

const ASPECT = 212 / 117;

type Props = {
  className?: string;
  height?: number;
  priority?: boolean;
};

export default function BerauCoalLogo({ className = "", height = 40, priority = false }: Props) {
  const width = Math.round(height * ASPECT);

  return (
    <Image
      src="/bc.jpg"
      alt="Berau Coal"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
