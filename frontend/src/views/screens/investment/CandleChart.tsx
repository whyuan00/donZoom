import React, {useMemo} from 'react';
import {View, Text, processColor, ProcessedColorValue} from 'react-native';
import {
  CandleStickChart,
  CandleStickData,
  CandleStickDataset,
} from 'react-native-charts-wrapper';

interface CandleData {
  x: string; // ISO 8601 형식의 날짜 문자열
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
  if (!data || data.length === 0) {
    console.log('No data available');
    return <Text>No data available</Text>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  const {processedData, dateLabels} = useMemo(() => {
    const processed = data.slice(-100).map((item, index) => ({
      x: index,
      shadowH: item.shadowH,
      shadowL: item.shadowL,
      open: item.open,
      close: item.close,
    }));
    const labels = data.slice(-100).map(item => formatDate(item.x));
    return {processedData: processed, dateLabels: labels};
  }, [data]);

  try {
    const chartData: CandleStickData = {
      dataSets: [
        {
          values: processedData,
          label: 'Stock Data',
          config: {
            highlightColor: processColor('darkgray'),
            shadowColor: processColor('black'),
            shadowWidth: 1,
            shadowColorSameAsCandle: true,
            increasingColor: processColor('blue'),
            increasingPaintStyle: 'FILL',
            decreasingColor: processColor('red'),
            drawValues: false,
          },
        } as CandleStickDataset,
      ],
    };

    return (
      <View style={{flex: 1}}>
        <CandleStickChart
          style={{flex: 1}}
          data={chartData}
          xAxis={{
            valueFormatter: dateLabels,
            position: 'BOTTOM',
            granularityEnabled: true,
            granularity: 1,
            labelCount: 5,
            labelRotationAngle: 0, // 수평 라벨
            avoidFirstLastClipping: true,
            axisLineColor: processColor('rgba(0,0,0,0.5)'), // 연한 축 선 색상
            textColor: processColor('gray'),
            gridColor: processColor('rgba(0,0,0,0.1)'), // 연한 그리드 색상
          }}
          yAxis={{
            left: {enabled: false},
            right: {
              enabled: true,
              axisLineColor: processColor('rgba(0,0,0,0.5)'), // 연한 축 선 색상
              textColor: processColor('gray'),
              gridColor: processColor('rgba(0,0,0,0.1)'), // 연한 그리드 색상
            },
          }}
          animation={{durationX: 0}}
          legend={{enabled: true}}
          maxVisibleValueCount={50}
          autoScaleMinMaxEnabled={true}
          visibleRange={{x: {min: 0, max: 30}}}
          zoom={{
            scaleX: 1.5,
            scaleY: 1,
            xValue: processedData.length - 1,
            yValue: 0,
            axisDependency: 'RIGHT',
          }}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
        />
      </View>
    );
  } catch (error) {
    console.error('Error rendering chart:', error);
    return <Text>Error rendering chart: {(error as Error).message}</Text>;
  }
};

export default CandlestickChartComponent;
export type {CandleData};
