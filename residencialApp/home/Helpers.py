def map_houses ():
    items = []
    for i in range(1, 16):  # del 1 al 15
        item = {
            'id': i,
            'condominio': 'Condominio 2-',
            'top': round(84.6 - (i - 1) * 2.2, 1),
            'left': round(68.5 - (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(16, 31):  # del 16 al 30
        item = {
            'id': i,
            'condominio': 'Condominio 2-',
            'top': round(20.4 + (i - 1) * 2.2, 1),
            'left': round(70.5 + (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(1, 18):  # del 1 al 17
        item = {
            'id': i,
            'condominio': 'Condominio 1-',
            'top': round(40.8 - (i - 1) * 2.2, 1),
            'left': round(64.2 - (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(18, 35):  # del 18 al 34
        item = {
            'id': i,
            'condominio': 'Condominio 1-',
            'top': round(-32.5 + (i - 1) * 2.2, 1),
            'left': round(65.5 + (i - 1) * 0.2, 1),
        }
        items.append(item)

    for i in range(1, 20):  # del 1 al 19
        item = {
            'id': i,
            'condominio': 'Condominio 3-',
            'top': round(16.1 - (i - 1) * 0.3, 1),
            'left': round(9.1 + (i - 1) * 2.2, 1),
        }
        items.append(item)

    for i in range(1, 12):  # del 1 al 11
        item = {
            'id': i,
            'condominio': 'Condominio 4-',
            'top': round(28.4 - (i - 1) * 0.3, 1),
            'left': round(25.6 + (i - 1) * 2.2, 1),
        }
        items.append(item)

    for i in range(12, 23):  # del 12 al 22
        item = {
            'id': i,
            'condominio': 'Condominio 4-',
            'top': round(28.1 + (i - 1) * 0.3, 1),
            'left': round(72.5 - (i - 1) * 2.2, 1),
        }
        items.append(item)
    
    for i in range(1, 27):  # del 1 al 26
        item = {
            'id': i,
            'condominio': 'Condominio 5-',
            'top': round(30.0 + (i - 1) * 1.99, 1),
            'left': round(9.4 + (i - 1) * 0.34, 1),
        }
        items.append(item)
    
    for i in range(1, 9):  # del 1 al 8
        item = {
            'id': i,
            'condominio': 'Condominio 6-',
            'top': round(77.7 - (i - 1) * 2.03, 1),
            'left': round(31.5 - (i - 1) * 0.36, 1),
        }
        items.append(item)

    for i in range(9, 17):  # del 9 al 16
        item = {
            'id': i,
            'condominio': 'Condominio 6-',
            'top': round(46.4 + (i - 1) * 2.03, 1),
            'left': round(34 + (i - 1) * 0.36, 1),
        }
        items.append(item)

    for i in range(1, 18):  # del 1 al 17
        item = {
            'id': i,
            'condominio': 'Condominio 7-',
            'top': round(91.8 - (i - 1) * 0.37, 1),
            'left': round(20.1 + (i - 1) * 2.205, 1),
        }
        items.append(item)
    
    return items