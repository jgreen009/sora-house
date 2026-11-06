import re
s=open("assets/architecture/hero-exterior.svg",encoding="utf-8").read()
stack=[]
for m in re.finditer(r"<(/?)([A-Za-z][\w:-]*)([^>]*?)(/?)>", s):
    close,name,attrs,selfc = m.groups()
    line = s[:m.start()].count("\n")+1
    if close:
        if stack and stack[-1][0]==name:
            stack.pop()
        else:
            print("MISMATCH close", name, "line", line, "stack top", stack[-1] if stack else None)
            break
    elif not selfc:
        stack.append((name,line))
print("remaining", stack[:5])
