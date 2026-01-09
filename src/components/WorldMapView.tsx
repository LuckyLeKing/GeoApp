import React from 'react';
import { Platform } from 'react-native';
import WorldMapViewWeb from './WorldMapView.web';
import WorldMapViewNative from './WorldMapView.native';
import { CountryState, Continent } from '../types';

type Props = {
    stateById: Record<string, CountryState>;
    onCountryPress?: (id: string) => void;
    currentContinent?: Continent;
};

export default function WorldMapView(props: Props) {
    if (Platform.OS === 'web') {
        return <WorldMapViewWeb {...props} />;
    }
    return <WorldMapViewNative {...props} />;
}
