import { Eye } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Icon Container with Eye */}
      <div className="relative group">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#0066CC] rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Main Icon */}
        <div className="relative bg-gradient-to-br from-[#003366] to-[#0066CC] p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <Eye className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#003366] to-[#0066CC] bg-clip-text text-transparent">
            Work
          </span>
          <span className="text-[#003366]">Eye</span>
        </span>
        <span className="text-[9px] text-gray-500 font-medium tracking-wider uppercase mt-0.5">
          Employee Monitoring
        </span>
      </div>
    </div>
  );
}