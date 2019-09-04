// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function (text) {
        // Encode user input for special characters , / ? : @ & = + $ #
        //var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
        var contentType = "text/plain";
        var chr = text.charAt(0);
        if (chr === "J") {
            contentType = "application/pdf";
        }
        else if (chr === "/") {
            contentType = "image/jpg";
        }
        else if (chr === "i") {
            contentType = "image/png";
        }
        else if (chr === "R") {
            contentType = "image/gif";
        }
        else if (chr === "U") {
            contentType = "image/webp";
        }
        const byteCharacters = atob(text);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const blobUrl = URL.createObjectURL(blob);

        chrome.tabs.create({ url: blobUrl });
    });