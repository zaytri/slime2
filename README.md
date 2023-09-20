# Slime2

Built with [Vite](https://vitejs.dev/) using [React](https://react.dev/)

## Getting Started

Guide: https://forums.slime2.stream/resources/getting-started-with-slime2.3/

## Using this repo for building themes

It's not necessary to build themes using this, but if you do then you get the added benefit of hot reloading and using `.env.local` for your tokens instead of directly including them in `TOKEN.js`.

1. You'll need to install:

   - **git** (https://git-scm.com/)
   - **Node.js** (https://nodejs.org/en) (LTS version recommended)

2. Use **git** to clone the repo.

   - I recommend using **Fork** (https://git-fork.com/)

3. Open the folder using the code editor of your choice.

   - I recommend using **VS Code** (https://code.visualstudio.com/)

4. In the terminal, navigate to the repo (**VS Code** terminal will already be there), and run this command:

   ```
   npm install
   ```

5. Create a `themes` folder at the root of the repo, and then create a folder inside that with the name of your custom theme. The folder structure should look like this:

   ```
   📁 client
     \_📄 base.css
     \_📄 base.js
     \_📄 TOKEN.js
   📁 release
   📁 src
   📁 themes
     \_📁 custom
   ...
   📄 base.html
   ...
   ```

6. Copy `base.css`, `base.js`, `base.html`, and `TOKEN.js` into your custom theme folder. Rename the `base.*` files to use the name of your custom theme instead of `base`. It should now look like this:

   ```
   ...
   📁 themes
     \_📁 custom
         \_📄 custom.css
         \_📄 custom.html
         \_📄 custom.js
         \_📄 TOKEN.js
   ...
   ```

7. Duplicate the `.env.production` file, renaming the copy to `.env.local`. In the file, set the value of `VITE_TWITCH_TOKEN` to the token that you can obtain from https://slime2.stream/token. It should look like this:

   ```shell
   VITE_TWITCH_TOKEN = 'yourTokenHere'
   ```

   - You could instead set this inside `TOKEN.js`, but this way you don't have to remember to remove it from `TOKEN.js` when you're ready to package and release the theme.

8. Run this command, substituting `custom` with the name of your theme:

   ```
   npm run theme theme.custom
   ```

9. The overlay should automatically open up in your web browser, and if you edit anything in your theme's custom folder, it will automatically update when you save! (Also known as hot reloading)

10. Once you're ready to package and release your theme, open `TOKEN.js` and double check that your token is **NOT** there. Then run this command, substituting `custom` with the name of your theme:

    ```
    npm run theme-build theme.custom
    ```

11. This will create a new `release-theme-*` folder using the name of your theme, which will look like this:

    ```
    📁 client
    📁 release
    📁 release-theme-custom
      \_📄 custom.css
      \_📄 custom.html
      \_📄 custom.js
      \_📄 TOKEN.js
    📁 src
    📁 themes
    ...
    ```

    - This will automatically update the HTML file to include the JS and CSS of the repo's version of slime2, and insert the version number at the top.

12. Zip all of the `release-theme-*` files, naming the `.zip` whatever you want, but I would recommend something like `custom-chat-1.0.0.zip`, and whenever you make a new update, update that version number accordingly!

13. Distribute that `.zip` file however you want! And if you just want to use your theme yourself, copy all of those files into a separate folder, put your token from https://slime2.stream/token into `TOKEN.js`, and load your HTML file into a browser source in OBS as a local file!
