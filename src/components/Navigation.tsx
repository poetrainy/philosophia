import { FC, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

import { APP_PAGE_YEARS, APP_TITLE } from '@/constant/app';
import { PATH_ABOUT } from '@/constant/path';
import { Z_INDEX_NAVIGATION } from '@/constant/style';

import ShareLink from '@/components/ShareLink';
import Copyright from '@/components/Copyright';
import AdminIcon from '@/components/AdminIcon';

import { AppPathType } from '@/types/link';

import { useWidth } from '@/contexts/useWidth';

type Props = {
  path: AppPathType | undefined;
};

const Navigation: FC<Props> = ({ path }) => {
  const router = useRouter();
  const { isMdSP } = useWidth();

  const navigationPath = !path?.length ? APP_PAGE_YEARS[0] : path;

  const [isOpenNavigationDrawer, setIsOpenNavigationDrawer] =
    useState<boolean>(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () =>
      setIsOpenNavigationDrawer(false)
    );
    window.addEventListener('beforeunload', () =>
      setIsOpenNavigationDrawer(false)
    );
    return () => {
      router.events.off('routeChangeStart', () =>
        setIsOpenNavigationDrawer(false)
      );
      window.removeEventListener('beforeunload', () =>
        setIsOpenNavigationDrawer(false)
      );
    };
  }, []);

  const Header = () => (
    <Heading
      as="h1"
      display="flex"
      alignItems="center"
      height="100%"
      fontSize="3.2rem"
      fontWeight="normal"
      fontFamily="logo"
      zIndex={Z_INDEX_NAVIGATION}
    >
      <NextLink passHref href="/">
        <Text
          as="a"
          sx={{
            opacity: 1,
            transition: 'opacity 0.2s, color 0.2s',
            ...(isOpenNavigationDrawer && {
              color: 'white',
            }),
            '&:hover': {
              opacity: 0.5,
            },
          }}
        >
          {APP_TITLE}
        </Text>
      </NextLink>
    </Heading>
  );
  const NavigationLink = () => (
    <Flex
      as="ul"
      sx={{
        ...(isMdSP
          ? {
              flexDirection: 'column',
            }
          : {
              gap: '8px',
              alignItems: 'center',
              fontSize: '1.7rem',
            }),
      }}
    >
      {APP_PAGE_YEARS.map((item, i) => (
        <Center
          as="li"
          key={item}
          alignItems="stretch"
          sx={{
            ...(isMdSP
              ? {
                  justifyContent: 'flex-start',
                  color: 'white',
                  h: '56px',
                  opacity: 1,
                  transition: 'opacity 0.2s',
                  '&::hover': {
                    opacity: 0.6,
                  },
                }
              : {
                  width: '80px',
                  height: '32px',
                  position: 'relative',
                }),
          }}
        >
          <NextLink passHref href={`/${i === 0 ? '' : item}`}>
            <Center
              as="a"
              sx={{
                ...(isMdSP
                  ? {
                      color: 'base.300',
                      ...(navigationPath === item && {
                        '&::after': {
                          content: '""',
                          display: 'block',
                          background: 'base.300',
                          width: '12px',
                          height: '12px',
                          ml: '16px',
                          borderRadius: '9999px',
                        },
                      }),
                    }
                  : {
                      w: '100%',
                      background: 'transparent',
                      transition: 'color 0.2s, background 0.2s',
                      ...(navigationPath === item && {
                        color: 'white',
                        background: 'base.800',
                      }),
                      '&:hover': {
                        color: 'white',
                        background: 'base.800',
                      },
                    }),
              }}
            >
              {item}
            </Center>
          </NextLink>
        </Center>
      ))}
    </Flex>
  );
  const AboutLink = () => (
    <NextLink passHref href={`/${PATH_ABOUT}`}>
      <Text
        as="a"
        sx={{
          ...(isMdSP
            ? {
                display: 'flex',
                alignItems: 'center',
                h: '56px',
                color: 'base.300',
                ...(path === PATH_ABOUT && {
                  '&::after': {
                    content: '""',
                    display: 'block',
                    background: 'base.300',
                    width: '12px',
                    height: '12px',
                    ml: '16px',
                    borderRadius: '9999px',
                  },
                }),
              }
            : {
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '4px',
                opacity: '1',
                overflow: 'hidden',
                transition: '0.2s opacity, 0.2s border-color',
                ...(path === PATH_ABOUT && {
                  borderColor: 'base.800',
                  borderStyle: 'solid',
                  borderWidth: '4px',
                }),
                '&:hover': {
                  opacity: 0.6,
                  borderColor: 'base.800',
                },
              }),
        }}
      >
        {isMdSP ? <>About</> : <AdminIcon />}
      </Text>
    </NextLink>
  );

  return (
    <Flex
      alignItems="center"
      w="100vw"
      h="160px"
      p="0 5vw"
      background="rgba(255, 255, 255, 0.8)"
      pos="fixed"
      top="0"
      zIndex={Z_INDEX_NAVIGATION}
    >
      <Header />
      <Spacer />
      <Flex
        fontFamily={{ base: 'logo', md: 'en' }}
        sx={{
          ...(isMdSP
            ? {
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                background: 'base.900',
                fontSize: '2.2rem',
                position: 'fixed',
                inset: '0 0 0 0',
                p: '160px 5vw 0',
                transition: 'transform 0.2s',
                transform: 'translateX(100%)',
                ...(isOpenNavigationDrawer && {
                  opacity: 1,
                  transform: 'translateX(0)',
                }),
              }
            : {
                gap: '24px',
                alignItems: 'center',
                fontSize: '1.7rem',
              }),
        }}
      >
        <NavigationLink />
        <AboutLink />
        {isMdSP && (
          <Center flexDir="column" gap="16px" w="100%" mt="24px">
            <ShareLink />
            <Copyright />
          </Center>
        )}
      </Flex>
      {isMdSP && (
        <Center
          as="button"
          onClick={() => setIsOpenNavigationDrawer(!isOpenNavigationDrawer)}
          flexDir="column"
          width="32px"
          height="32px"
          zIndex={Z_INDEX_NAVIGATION}
          sx={{
            '&::before': {
              content: '""',
              display: 'block',
              width: '32px',
              height: '2px',
              background: 'base.800',
              mb: '8px',
              transition: 'background 0.2s',
              ...(isOpenNavigationDrawer && {
                background: 'white',
              }),
            },
            '&::after': {
              content: '""',
              display: 'block',
              width: '32px',
              height: '2px',
              background: 'base.800',
              transition: 'background 0.2s',
              ...(isOpenNavigationDrawer && {
                background: 'white',
              }),
            },
          }}
        />
      )}
    </Flex>
  );
};

export default Navigation;
