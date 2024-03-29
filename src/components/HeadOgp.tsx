import { FC } from 'react';
import Head from 'next/head';

import {
  APP_URL,
  APP_OGP,
  APP_TITLE_FULL,
  APP_MAIN_IMAGE,
  APP_DESCRIPTION,
} from '@/constant/app';

import { AppPathType } from '@/types/link';

type Props = {
  path: AppPathType | undefined;
  isIndex?: boolean;
};

const HeadOgp: FC<Props> = ({ path, isIndex }) => {
  return (
    <Head>
      <title>{APP_TITLE_FULL}</title>
      <meta property="og:title" content={APP_TITLE_FULL} />
      <meta property="og:description" content={APP_DESCRIPTION} />
      <meta property="og:url" content={APP_URL} />
      {/* {isIndex ? (
        <>
          <title>{APP_TITLE_FULL}</title>
          <meta property="og:title" content={APP_TITLE_FULL} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:url" content={APP_URL} />
        </>
      ) : !!path ? (
        <>
          <title>{`${APP_OGP[path].title}｜${APP_TITLE_FULL}`}</title>
          <meta
            property="og:title"
            content={`${APP_OGP[path].title}｜${APP_TITLE_FULL}`}
          />
          <meta property="og:description" content={APP_OGP[path].description} />
          <meta property="og:url" content={`${APP_URL}${path}`} />
        </>
      ) : (
        <>
          <title>{`404｜${APP_TITLE_FULL}`}</title>
          <meta property="og:title" content={`404｜${APP_TITLE_FULL}`} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:url" content={`${APP_URL}404`} />
        </>
      )} */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={APP_TITLE_FULL} />
      <meta property="og:image" content={APP_MAIN_IMAGE} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};

export default HeadOgp;
