import { APP_SHARE_LINKS } from '@/constant/app';
import { Box, Flex, Link } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  isFoot?: boolean;
};

const ShareLink: FC<Props> = ({ isFoot }) => (
  <Flex as="ul" gap={{ base: '6px', sm: '8px' }}>
    {APP_SHARE_LINKS.map((item) => (
      <Box as="li" key={item.text}>
        <Link
          href={item.url}
          target="_blank"
          display="block"
          w={{ base: '36px', sm: '40px' }}
          h={{ base: '36px', sm: '40px' }}
        >
          <item.svg fill={isFoot ? '#464646' : '#D4D4D4'} />
        </Link>
      </Box>
    ))}
  </Flex>
);

export default ShareLink;
