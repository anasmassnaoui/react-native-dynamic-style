import { useMemo } from 'react';
import {
    ImageStyle,
    StyleSheet,
    TextStyle,
    ViewStyle,
    useWindowDimensions,
} from 'react-native';

type DeepRecord = Record<string, Record<string, any>>;
type FunctionType = (...args: any) => any;
type FunctionStyleParams = {
    width: number;
    height: number;
    isExtraSmallAndUp: boolean;
    isExtraSmall: boolean;
    isSmallAndUp: boolean;
    isSmall: boolean;
    isSmallAndDown: boolean;
    isMediumAndUp: boolean;
    isMedium: boolean;
    isMediumAndDown: boolean;
    isLargeAndUp: boolean;
    isLarge: boolean;
    isLargeAndDown: boolean;
    isExtraLargeAndUp: boolean;
    isExtraLarge: boolean;
    isExtraLargeAndDown: boolean;
    isExtraExtraLarge: boolean;
    isExtraExtraLargeAndDown: boolean;
};
type FunctionStyle<T> = (params: FunctionStyleParams) => T | undefined;
type BreakpointStyle<
    XS = any,
    S = any,
    M = any,
    L = any,
    XL = any,
    XXL = any,
> = { xs?: XS; s?: S; m?: M; l?: L; xl?: XL; xxl?: XXL };

type ContainNumber = number | string | undefined;
type DynamicNumberStyle<T> = T extends undefined
    ? undefined
    : T extends number
    ? number | [number, number] | FunctionStyle<T>
    : T | FunctionStyle<T>;

type DynamicStyle<T> = {
    [P in keyof T]: T[P] extends ContainNumber
        ?
              | DynamicNumberStyle<T[P]>
              | BreakpointStyle<T[P], T[P], T[P], T[P], T[P], T[P]>
        :
              | T[P]
              | BreakpointStyle<T[P], T[P], T[P], T[P], T[P], T[P]>
              | FunctionStyle<T[P]>;
};

type DynamicNamedStyles<T> = {
    [P in keyof T]:
        | DynamicStyle<ViewStyle>
        | BreakpointStyle<
              ViewStyle,
              ViewStyle,
              ViewStyle,
              ViewStyle,
              ViewStyle,
              ViewStyle
          >
        | DynamicStyle<TextStyle>
        | BreakpointStyle<
              TextStyle,
              TextStyle,
              TextStyle,
              TextStyle,
              TextStyle,
              TextStyle
          >
        | DynamicStyle<ImageStyle>
        | BreakpointStyle<
              ImageStyle,
              ImageStyle,
              ImageStyle,
              ImageStyle,
              ImageStyle,
              ImageStyle
          >;
};
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
type StaticBreakpointStyle<T extends BreakpointStyle> =
    | (T extends { xs?: any } ? T['xs'] : undefined)
    | (T extends { s?: any } ? T['s'] : undefined)
    | (T extends { m?: any } ? T['m'] : undefined)
    | (T extends { l?: any } ? T['l'] : undefined)
    | (T extends { xl?: any } ? T['xl'] : undefined)
    | (T extends { xxl?: any } ? T['xxl'] : undefined);
type StaticNamedStyles<T> = {
    [P in keyof T]: T[P] extends BreakpointStyle
        ?
              | StaticBreakpointStyle<T[P]>
              | Omit<T[P], 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'>
        : {
              [S in keyof T[P]]: T[P][S] extends [number, number]
                  ? number
                  : T[P][S] extends FunctionType
                  ? ReturnType<T[P][S]>
                  : T[P][S] extends BreakpointStyle
                  ? StaticBreakpointStyle<T[P][S]>
                  : T[P][S];
          };
};

const DynamicStyleSheet = {
    create: <T extends DynamicNamedStyles<T>>(
        styles: T | DynamicNamedStyles<T>,
    ): T => {
        return styles as T;
    },
    getRelativeValue: (
        minValue: number,
        minRelativeValue: number,
        maxValue: number,
        maxRelativeValue: number,
        value: number,
    ) => {
        if (value <= minValue) {
            return minRelativeValue;
        } else if (value >= maxValue) {
            return maxRelativeValue;
        } else {
            if (minRelativeValue < maxRelativeValue) {
                return (
                    minRelativeValue +
                    (value - minValue) *
                        ((maxRelativeValue - minRelativeValue) /
                            (maxValue - minValue))
                );
            } else {
                return (
                    minRelativeValue -
                    (value - minValue) *
                        ((minRelativeValue - maxRelativeValue) /
                            (maxValue - minValue))
                );
            }
        }
    },
    getBreakpointStyle: (
        style: Record<string, any>,
        breakpointsParams: FunctionStyleParams,
    ) => {
        let breakpointStyle: any;
        if ('xs' in style && breakpointsParams.isExtraSmallAndUp) {
            breakpointStyle = style.xs;
        }
        if ('s' in style && breakpointsParams.isSmallAndUp) {
            breakpointStyle = style.s;
        }
        if ('m' in style && breakpointsParams.isMediumAndUp) {
            breakpointStyle = style.m;
        }
        if ('l' in style && breakpointsParams.isLargeAndUp) {
            breakpointStyle = style.l;
        }
        if ('xl' in style && breakpointsParams.isExtraLargeAndUp) {
            breakpointStyle = style.xl;
        }
        if ('xxl' in style && breakpointsParams.isExtraExtraLarge) {
            breakpointStyle = style.xxl;
        }
        return breakpointStyle;
    },
};

const useBreakpoints = (): FunctionStyleParams => {
    const { width, height } = useWindowDimensions();

    const isExtraSmallAndUp = width >= 0;
    const isExtraSmall = width < 576;

    const isSmallAndUp = width >= 576;
    const isSmall = width >= 576 && width < 768;
    const isSmallAndDown = width < 768;

    const isMediumAndUp = width >= 768;
    const isMedium = width >= 768 && width < 992;
    const isMediumAndDown = width < 992;

    const isLargeAndUp = width >= 992;
    const isLarge = width >= 992 && width < 1200;
    const isLargeAndDown = width < 1200;

    const isExtraLargeAndUp = width >= 1200;
    const isExtraLarge = width >= 1200 && width < 1400;
    const isExtraLargeAndDown = width < 1400;

    const isExtraExtraLarge = width >= 1400;
    const isExtraExtraLargeAndDown = width >= 1400 || width < 1400;

    return {
        width,
        height,
        isExtraSmallAndUp,
        isExtraSmall,
        isSmallAndUp,
        isSmall,
        isSmallAndDown,
        isMediumAndUp,
        isMedium,
        isMediumAndDown,
        isLargeAndUp,
        isLarge,
        isLargeAndDown,
        isExtraLargeAndUp,
        isExtraLarge,
        isExtraLargeAndDown,
        isExtraExtraLarge,
        isExtraExtraLargeAndDown,
    };
};

const useDynamicStyles = <T extends DynamicNamedStyles<T>>(
    dynamicStyles: T | DynamicNamedStyles<T>,
    params?: { minWidth: number; maxWidth: number },
): StaticNamedStyles<T> => {
    const breakpointsParams = useBreakpoints();
    return useMemo(() => {
        const styles: DeepRecord = {};
        const dynamicStylesRecord = dynamicStyles as DeepRecord;
        for (const styleKey of Object.keys(dynamicStyles)) {
            const breakpointStyle = DynamicStyleSheet.getBreakpointStyle(
                dynamicStylesRecord[styleKey],
                breakpointsParams,
            );
            styles[styleKey] = { ...breakpointStyle };
            for (const styleProperty of Object.keys(
                dynamicStylesRecord[styleKey],
            )) {
                const styleValue = dynamicStylesRecord[styleKey][styleProperty];
                if (Array.isArray(styleValue)) {
                    if (styleValue.length >= 2 && params) {
                        styles[styleKey][styleProperty] =
                            DynamicStyleSheet.getRelativeValue(
                                params.minWidth,
                                styleValue[0],
                                params.maxWidth,
                                styleValue[1],
                                breakpointsParams.width,
                            );
                    }
                } else if (typeof styleValue === 'function') {
                    styles[styleKey][styleProperty] =
                        styleValue(breakpointsParams);
                } else if (typeof styleValue === 'object') {
                    styles[styleKey][styleProperty] =
                        DynamicStyleSheet.getBreakpointStyle(
                            styleValue,
                            breakpointsParams,
                        );
                } else {
                    styles[styleKey][styleProperty] = styleValue;
                }
            }
        }
        return StyleSheet.create(styles as NamedStyles<T>);
    }, [dynamicStyles, params, breakpointsParams]);
};

export default DynamicStyleSheet;
export { useDynamicStyles, useBreakpoints };
