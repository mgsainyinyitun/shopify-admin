import { Helmet } from 'react-helmet-async';

import { MerchantView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function MerchantPage() {
  return (
    <>
      <Helmet>
        <title> Merchant | Information </title>
      </Helmet>

      <MerchantView />
    </>
  );
}
