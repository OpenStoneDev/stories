import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import { usePrevious } from './helpers/StateHelpers';
import { IUserStory, StoryCircleListItemProps } from './interfaces';

import DEFAULT_AVATAR from './assets/images/nothing.png';

const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = 200,
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {
  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  const avatarWrapperSize = avatarSize + 4;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => _handleItemPress(item)}
        style={[
          styles.avatarWrapper,
          {
            height: avatarWrapperSize,
            width: avatarWrapperSize,
          },
          avatarWrapperStyle,
          !isPressed
            ? {
                borderColor: unPressedBorderColor ?? 'red',
              }
            : {
                borderColor: pressedBorderColor ?? 'grey',
              },
        ]}
      >
        <Image
          style={[
            {
              height: 160,
              width: 300,
              borderRadius: 10,
            },
            avatarImageStyle,
          ]}
          source={{ uri: item.cover?.original }}
          defaultSource={DEFAULT_AVATAR}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 85,
    marginLeft: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
    width: 100,
  },
});
