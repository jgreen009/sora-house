from PIL import Image
im = Image.open("design/prototypes/screenshots/index-desktop.png")
print(im.size)
w,h = im.size
# gallery section approx 72%-85% of height based on visual
im.crop((0, int(h*0.70), w, int(h*0.87))).save("C:/Users/OWNER/AppData/Local/Temp/opencode/shop-gallery.png")
im.crop((0, 0, w, int(h*0.13))).save("C:/Users/OWNER/AppData/Local/Temp/opencode/shop-hero.png")
