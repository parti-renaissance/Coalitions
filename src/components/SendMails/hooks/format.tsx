import { IConvertToHTMLConfig } from 'draft-convert';
import { DraftInlineStyleType, DraftBlockType, RawDraftEntity } from 'draft-js';
import React from 'react';

export const mailFormatting: IConvertToHTMLConfig<
  DraftInlineStyleType,
  DraftBlockType,
  RawDraftEntity
> = {
  blockToHTML: block => {
    if (block?.data !== undefined && block?.data['text-align'] !== undefined) {
      return <p style={{ textAlign: block?.data['text-align'] }} />;
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === 'LINK') {
      return <a href={entity.data.url}>{originalText}</a>;
    }
    if (entity.type === 'IMAGE') {
      return <img src={entity.data.src} alt="" />;
    }
    return originalText;
  },
};
