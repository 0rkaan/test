export default function Logo({ size = "normal" }) {
    const logoStyle = {
      small: "w-8 h-8 text-lg",
      normal: "w-12 h-12 text-xl",
      large: "w-16 h-16 text-3xl",
    };
  
    return (
      <div className={`${logoStyle[size]} bg-primary flex items-center justify-center rounded text-white font-bold`}>
        T
      </div>
    );
  }