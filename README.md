Morrunwind

Install:
    - Put the morrunwind.exe in the Morrowind.exe folder
    - Execute it once
      (You should see appear a Morrowind Launcher.Original.exe,
      it's your backup exe, in case you want to remove this mod.)
    - Open the new morrunwind.json
    - Add your executables you want to launch with your morrowind game
        Example:
        {
            "quicksave": [],
            "Morrowind Enhanced": []
        }

        (Don't add the ".exe" extension, it will be added.
        The empty array "[]", is for the exe arguments, in case you need them)
    - Save the file

Usage:
    - Launch Morrowind with Morrowind Launcher
    - Don't think about launching or closing the other executables.
        Everything will be managed automatically.
        #PeaceOfMind

Troubleshooting:
    If your game doesn't launch, it's probably because one of the executable can't be launched.
    It needs only one executable that fails to launch, to prevent everything from launching.
    (You wouldn't have a corrupt save or anything because one exe didn't launch, right ?)
    Check your morrunwind.json if everything is correct.

