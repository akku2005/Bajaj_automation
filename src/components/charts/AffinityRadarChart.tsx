import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';

interface AffinityRadarChartProps {
    data: {
        product_affinity: number;
        partner_approval_likelihood: number;
        channel_responsiveness: number;
    };
}

export default function AffinityRadarChart({ data }: AffinityRadarChartProps) {
    const chartData = [
        { subject: 'Product Affinity', value: data.product_affinity * 100, fullMark: 100 },
        { subject: 'Partner Approval', value: data.partner_approval_likelihood * 100, fullMark: 100 },
        { subject: 'Channel Response', value: data.channel_responsiveness * 100, fullMark: 100 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                    name="Affinity Scores"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
