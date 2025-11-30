async function loadVideos() {
    try {
        const res = await fetch('videos.json');
        const data = await res.json();
        const lists = data.lists;
        const container = document.getElementById('lists-container');

        for (const list of lists) {
            // Create section wrapper
            const section = document.createElement('div');
            section.className = "list-section";

            // Header
            const header = document.createElement('div');
            header.className = "list-header";
            header.textContent = list.name;
            section.appendChild(header);

            // Content container
            const content = document.createElement('div');
            content.className = "list-content";

            // Grid inside content
            const grid = document.createElement('div');
            grid.className = "video-grid";

            // Fetch each video's details
            for (const video of list.videos) {
                const id = video.id;

                // Fetch title via oEmbed
                let title = "Unknown Title";
                try {
                    const oembedURL = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
                    const oembedRes = await fetch(oembedURL);
                    const oembedData = await oembedRes.json();
                    title = oembedData.title;
                } catch (err) {
                    console.warn(`Title fetch got smacked by Zeus for ${id}`, err);
                }

                const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

                const card = document.createElement('a');
                card.href = `https://youtube.com/watch?v=${id}`;
                card.target = "_blank";
                card.className = "video-card";

                card.innerHTML = `
                    <img class="thumbnail" src="${thumb}" alt="${title}">
                    <div class="title">${title}</div>
                `;

                grid.appendChild(card);
            }

            content.appendChild(grid);
            section.appendChild(content);
            container.appendChild(section);

            // Collapsible behavior
            header.addEventListener('click', () => {
                const isOpen = content.style.display === "block";
                content.style.display = isOpen ? "none" : "block";
            });
        }

    } catch (err) {
        console.error("Entire system cursed by Hades:", err);
    }
}

loadVideos();
