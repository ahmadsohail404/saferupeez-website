import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function PhoneSimulator() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative mx-auto w-[340px] h-[680px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative h-full bg-gradient-to-b from-purple-50 via-white to-amber-50/50 rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-3 text-gray-900">
            <span className="text-sm">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-gray-900 rounded-sm relative">
                <div className="absolute inset-0.5 bg-gray-900 rounded-sm" />
              </div>
            </div>
          </div>
          
          {/* App Header */}
          <div className="px-6 py-4">
            <h3 className="text-gray-900 mb-1">Today&apos;s Insights</h3>
            <p className="text-gray-600">Live precious metal rates</p>
          </div>
          
          {/* Content */}
          <div className="px-6 space-y-4 pb-6">
            {/* Gold Card */}
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
              <CardContent className="p-5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-gray-600 mb-1">Gold (24K)</div>
                      <div className="text-gray-900">₹6,245/gm</div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      <TrendingUp className="w-4 h-4" />
                      <span>2.4%</span>
                    </div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="flex items-end gap-1 h-12 mb-4">
                    {[40, 55, 45, 60, 50, 70, 65, 75, 70, 80, 75, 85].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-amber-400 to-amber-300 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Your Holdings: 12.5g</span>
                    <span className="text-purple-600">₹78,062</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Silver Card */}
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
              <CardContent className="p-5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/20 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-gray-600 mb-1">Silver</div>
                      <div className="text-gray-900">₹78.50/gm</div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full">
                      <TrendingDown className="w-4 h-4" />
                      <span>0.8%</span>
                    </div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="flex items-end gap-1 h-12 mb-4">
                    {[70, 65, 75, 70, 60, 55, 60, 50, 55, 45, 50, 40].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Your Holdings: 250g</span>
                    <span className="text-purple-600">₹19,625</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                <div className="text-gray-600 mb-1">Total Value</div>
                <div className="text-gray-900">₹97,687</div>
                <div className="text-purple-600 text-sm">+₹2,340 today</div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <div className="text-gray-600 mb-1">Returns</div>
                <div className="text-gray-900">+8.2%</div>
                <div className="text-amber-600 text-sm">Last 30 days</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity">
                Buy Now
              </button>
              <button className="border-2 border-gray-200 text-gray-900 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 to-amber-200/30 rounded-3xl blur-3xl -z-10" />
    </div>
  );
}
