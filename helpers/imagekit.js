const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_WEij4vDuV8NBKyxJmWKxNFqVRvw=',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'rivate_A8QouTWJRoWR9UIYTZCyf679zW8=',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/fatawahid15',
});

module.exports = imagekit;
