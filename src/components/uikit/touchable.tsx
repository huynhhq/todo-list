import React, {PropsWithChildren, memo, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersLayout,
  IModifiersTest,
} from 'custom-ui-kit';
import {destructPropsToStyle} from '@helpers/uikitHelper';

interface ITouchableProps
  extends TouchableOpacityProps,
    IModifiersSpacing,
    IModifiersStyling,
    IModifiersLayout,
    IModifiersTest {}

const FuncComponent = (props: PropsWithChildren<ITouchableProps>) => {
  const {children, style, ...rest} = props;
  const result = useMemo(() => {
    const {_styles, _props} = destructPropsToStyle(rest);
    const s = StyleSheet.flatten([
      style,
      _styles.layoutStyle,
      _styles.spacingStyle,
      _styles.stylingStyle,
    ]);
    return {s, p: _props};
  }, [rest, style]);

  return (
    <TouchableOpacity {...result.p} style={result.s}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(FuncComponent);
