
#para hacer cambios en la web es necesario usar esto 
git status                         # Verificar qué archivos han cambiado
git add .                           # Agregar todos los archivos al área de staging
git commit -m "Descripción de los cambios"  # Crear un commit con una descripción
git push origin main                # Subir los cambios a GitHub


#Si GitHub Pages No Refleja Cambios
git commit --allow-empty -m "Forzando actualización de GitHub Pages"
git push origin main



git remote set-url origin https://<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>@github.com/GerryLCDF/myweb.git


git add .
git commit -m "add cambios"
git push origin main
