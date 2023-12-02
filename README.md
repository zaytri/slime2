# slime2

Built with [Vite](https://vitejs.dev/) using [React](https://react.dev/)

[<img src='https://i.imgur.com/nb9001m.png' width='300' alt='Support me on Ko-fi' />](https://ko-fi.com/zaytri)

## Terms of Use

- Do not claim this as your own or sell it
- You may modify the simple-chat widget to create your own slime2 widget, and you can freely share or sell your widget
- Feel free to post your widget here on the forums: https://forums.slime2.stream/resources/categories/themes.2/

## Widget Development Docs

https://docs.slime2.stream/

## Support

https://forums.slime2.stream/forums/help.13/

## If you want to use this repo to build widgets

It's not necessary to build widgets using this, but if you do then you get the added benefit of hot reloading and using `.env.local` for your tokens instead of directly including them in `SLIME2_*_KEY.js`.

1.  You'll need to install:

    - **git** (https://git-scm.com/)
    - **Node.js** (https://nodejs.org/en) (LTS version recommended)

2.  Use **git** to clone the repo.

    - I recommend using **Fork** (https://git-fork.com/)

3.  Open the folder using the code editor of your choice.

    - I recommend using **VS Code** (https://code.visualstudio.com/)

4.  In the terminal, navigate to the repo (**VS Code** terminal will already be there), and run this command:

    ```
    npm install
    ```

5.  In the `widgets` folder, create a copy of the `slime-chat` folder. Rename it and the `slime-chat` files to the name of your custom widget. The folder structure should look like this:

    ```
    ...
    📁 widgets
      \_📁 custom-widget
         \_📄 overlay-custom-widget.html
         \_📄 README.txt
         \_📄 script-custom-widget.js
         \_📄 settings-custom-widget.js
         \_📄 styles-custom-widget.css
      \_📁 slime-chat
         \_📄 overlay-slime-chat.html
         \_📄 README.txt
         \_📄 script-slime-chat.js
         \_📄 settings-custom-widget.js
         \_📄 styles-slime-chat.css
    ...
    ```

6.  Duplicate the `.env.production` file, renaming the copy to `.env.local`. In the file, set the values to the keys that you can download from https://slime2.stream/account. For example, setting the Twitch key would look like this:

    ```shell
    VITE_TWITCH_KEY = 'yourKeyHere'
    ```

7.  Run this command, substituting `custom-widget` with the name of your widget:

    ```
    npm run widget custom-widget
    ```

8.  The overlay should automatically open up in your web browser, and if you edit anything in your widget's custom folder, it will automatically update when you save! (Also known as hot reloading)

9.  Once you're ready to package and release your widget, run this command, substituting `custom-widget` with the name of your widget:

    ```
    npm run build:widget custom-widget
    ```

10. This will create a new `widgets/release/custom-widget` folder using the name of your widget, which will look like this:

    ```
    ...
    📁 widgets
      \_📁 release
         \_📁 custom-widget
            \_📄 overlay-custom-widget.html
            \_📄 README.txt
            \_📄 script-custom-widget.js
            \_📄 settings-custom-widget.js
            \_📄 styles-custom-widget.css
    ...
    ```

- This will automatically update the HTML file to include the JS and CSS of the repo's version of slime2, replaces all instances of `{version}` with the slime2 version number, and replaces all instances of `{widget}` with your widget name.
- This will also automatically delete any `SLIME2_*_KEY.js` files, since they shouldn't be included in a public build.

11. Zip all of the `release/custom-widget` files and name the `.zip` whatever you want. I would recommend something like `Custom Widget 1.0.0.zip`. Whenever you make a new update, update that version number accordingly!

12. Distribute that `.zip` file however you want! And if you just want to use your widget yourself, copy all of those files into a separate folder, copy in the `SLIME2_*_KEY*.js` file that you already downloaded from https://slime2.stream/account, and load your HTML file into a browser source in OBS as a local file!

    > I personally recommend distributing via Ko-fi, because anyone who downloads/buys something from your shop there will automatically follow you, they'll always know when you put a new item into your shop, you can send a notice to all your followers when you've made an update, and buyers will always have access to the latest file! (Which doesn't happen on Etsy, where buyers can only download the file that was there at the time that they bought it.)

13. **Bonus Tip**: Use the `widgets` folder itself as a git repo to easily track and version control your own widget development!

14. **Bonus Tip 2**: If you create a `widgets-private` folder, you can use the commands `npm run private` and `npm run build:private` instead of `npm run widget` and `npm run build:widget`, allowing you to create widgets in there that are ignored by git. You can use that folder as a private repo as well!
