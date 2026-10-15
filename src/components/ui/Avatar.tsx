import { avatarHue, cn, initials } from "@/lib/utils";

export function Avatar({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const hue = avatarHue(name);
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(145deg, hsl(${hue} 42% 36%), hsl(${hue + 18} 50% 22%))`,
      }}
    >
      {initials(name)}
    </span>
  );
}
