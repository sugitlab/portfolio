import {
  FcIdea,
  FcCommandLine,
  FcInfo,
  FcAdvertising,
  FcBiomass,
  FcKindle,
  FcPositiveDynamic,
  FcReading,
  FcGraduationCap,
} from "react-icons/fc";

/**
 * getIcon 
 * @param type 
 *  idea/vim/news/bio/mobile/stats/book/research
 * @param size 
 * @returns 
 */
export function getIcon(type?: string, size?: number) {
  if (type === undefined || size === undefined) {
    return <FcInfo size={size} />;
  }
  switch (type) {
    case "idea":
      return <FcIdea size={size} />;
    case "vim":
      return <FcCommandLine size={size} />;
    case "news":
      return <FcAdvertising size={size} />;
    case "bio":
      return <FcBiomass size={size} />;
    case "mobile":
      return <FcKindle size={size} />;
    case "stats":
      return <FcPositiveDynamic size={size} />;
    case "book":
      return <FcReading size={size} />;
    case "research":
      return <FcGraduationCap size={size} />;
    default:
      return <FcInfo size={size} />;
  }
}
