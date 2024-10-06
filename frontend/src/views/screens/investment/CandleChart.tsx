import React from 'react';
import {processColor, ProcessedColorValue} from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';

interface CandleData {
  x: number;
  shadowH: number;
  shadowL: number;
  open: number;
  close: number;
}

interface CandlestickChartComponentProps {
  data: CandleData[];
}

const CandlestickChartComponent: React.FC<CandlestickChartComponentProps> = ({
  data,
}) => {
  const chartConfig = {
    data: {
      dataSets: [
        {
          values: data,
          label: 'Stock Data',
          config: {
            highlightColor: processColor('darkgray') as ProcessedColorValue,
            shadowColor: processColor('black') as ProcessedColorValue,
            shadowWidth: 1,
            shadowColorSameAsCandle: true,
            increasingColor: processColor('green') as ProcessedColorValue,
            increasingPaintStyle: 'FILL' as 'FILL',
            decreasingColor: processColor('red') as ProcessedColorValue,
          },
        },
      ],
    },
    xAxis: {
      valueFormatter: 'date',
      valueFormatterPattern: 'yyyy-MM-dd',
      position: 'BOTTOM',
    },
  };

  return (
    <CandleStickChart
      style={{flex: 1}}
      data={chartConfig.data}
      xAxis={chartConfig.xAxis}
      animation={{durationX: 0}}
      legend={{enabled: true}}
      maxVisibleValueCount={16}
      autoScaleMinMaxEnabled={true}
    />
  );
};

export default CandlestickChartComponent;
export type {CandleData};
