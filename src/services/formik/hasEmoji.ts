import emojiRegex from 'emoji-regex/RGI_Emoji';

export const hasEmoji = (text?: string): boolean => {
  if (text === undefined) {
    return false;
  }

  const regex = emojiRegex();
  return regex.test(text);
};
