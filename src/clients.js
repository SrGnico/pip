import {createClient} from "@sanity/client";

export default createClient({
  projectId: "3k1rymx3", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-03-25",
  token: 'skuD17fAp6eRVTzW6APgkP16Ew7Je5HMoFlD2gOdmlQk1cHAtcKKTN1ttPKjkfcMVxHOX9PQwhWw0V9gH',
  ignoreBrowserTokenWarning: true
});


 /*
token : skPrtSgL9FSmL8zqFpELHRGq4JN8hoftMAC5Ha9yrSx1NvUyP0D45jLReSYj0alKhZPrEW9CGvkr5kMVkIqOFKYZr3n1j9en0M3bgoVMZT502GUimxsGIBGI24ivzivf8VhSEysRyCcgnY8y3ANhKV8gQqAjUNraM5TzhQKdJQMYJfipGENQ
*/