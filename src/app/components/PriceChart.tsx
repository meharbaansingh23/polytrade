import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, CartesianGrid } from 'recharts';

interface ChartDataPoint {
  time: string;
  yes: number;
  no: number;
}

const historicalData: ChartDataPoint[] = [
  { time: 'Apr 12', yes: 58, no: 42 },
  { time: 'Apr 14', yes: 61, no: 39 },
  { time: 'Apr 16', yes: 63, no: 37 },
  { time: 'Apr 18', yes: 72, no: 28 },
  { time: 'Apr 20', yes: 69, no: 31 },
  { time: 'Apr 22', yes: 65, no: 35 },
  { time: 'Apr 24', yes: 68, no: 32 },
  { time: 'Apr 26', yes: 71, no: 29 },
  { time: 'Apr 28', yes: 66, no: 34 },
  { time: 'Apr 30', yes: 63, no: 37 },
  { time: 'May 2', yes: 60, no: 40 },
  { time: 'May 4', yes: 64, no: 36 },
  { time: 'May 6', yes: 68, no: 32 },
  { time: 'May 8', yes: 65, no: 35 },
  { time: 'May 11', yes: 67, no: 33 },
];

interface PriceChartProps {
  currentPrice: number;
  change: number;
}

export function PriceChart({ currentPrice, change }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState('1M');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white border border-[#F0F0F0] rounded-[10px] p-2.5"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        >
          <div className="text-[#6B6B6B] text-[12px] font-[500] mb-1">
            {payload[0].payload.time}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[#16A34A] text-[12px] font-[700]">
              YES: {payload[0].payload.yes}%
            </div>
            <div className="text-[#DC2626] text-[12px] font-[700]">
              NO: {payload[0].payload.no}%
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[80px] font-[900] text-[#FF4C00] leading-none mb-2 tracking-[-3px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {Math.round(currentPrice * 100)}%
          </div>
          <div className="text-[#6B6B6B] text-[14px] font-[400]">
            probability of YES
            <span className="ml-3 px-2 py-0.5 bg-[#ECFDF5] text-[#16A34A] text-[13px] font-[600] rounded-full">
              +{change.toFixed(1)} today
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span className="text-[#6B6B6B] text-[12px] font-[600]">YES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span className="text-[#6B6B6B] text-[12px] font-[600]">NO</span>
            </div>
          </div>
          <div className="flex gap-2">
            {['6H', '1D', '1W', '1M', 'ALL'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-[600] transition-all duration-200 border-0 cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#FF4C00] text-white'
                    : 'bg-transparent text-[#6B6B6B] hover:text-[#1D1D1D]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-6">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={historicalData}>
            <defs>
              <linearGradient id="colorYes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.06} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.06} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#F0F0F0"
              tick={{ fill: '#6B6B6B', fontSize: 11, fontFamily: 'Inter Tight' }}
              axisLine={{ stroke: '#F0F0F0' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#F0F0F0"
              tick={{ fill: '#6B6B6B', fontSize: 11, fontFamily: 'Inter Tight' }}
              axisLine={{ stroke: '#F0F0F0' }}
              tickLine={false}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F0F0F0', strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="yes"
              stroke="none"
              fill="url(#colorYes)"
            />
            <Area
              type="monotone"
              dataKey="no"
              stroke="none"
              fill="url(#colorNo)"
            />
            <Line
              key="yes-line"
              type="monotone"
              dataKey="yes"
              stroke="#16A34A"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              key="no-line"
              type="monotone"
              dataKey="no"
              stroke="#DC2626"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              key="yes-dot"
              type="monotone"
              dataKey="yes"
              stroke="none"
              dot={(props: any) => {
                if (props.payload.time === 'May 11') {
                  return (
                    <circle
                      key={`yes-dot-${props.index}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill="#16A34A"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              }}
            />
            <Line
              key="no-dot"
              type="monotone"
              dataKey="no"
              stroke="none"
              dot={(props: any) => {
                if (props.payload.time === 'May 11') {
                  return (
                    <circle
                      key={`no-dot-${props.index}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill="#DC2626"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
